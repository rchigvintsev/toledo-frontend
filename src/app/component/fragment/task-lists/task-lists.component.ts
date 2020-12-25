import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {NgForm} from '@angular/forms';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {TranslateService} from '@ngx-translate/core';

import {TaskList} from '../../../model/task-list';
import {TaskListService} from '../../../service/task-list.service';
import {AuthenticationService} from '../../../service/authentication.service';
import {LogService} from '../../../service/log.service';
import {WebServiceBasedComponent} from '../../web-service-based.component';
import {PathMatcher} from '../../../util/path-matcher';
import {Strings} from '../../../util/strings';

@Component({
  selector: 'app-task-lists',
  templateUrl: './task-lists.component.html',
  styleUrls: ['./task-lists.component.styl']
})
export class TaskListsComponent extends WebServiceBasedComponent implements OnInit, OnDestroy {
  @ViewChild('taskListForm')
  taskListForm: NgForm;
  taskListFormModel = new TaskList();
  taskListFormSubmitEnabled = false;
  taskLists: TaskList[] = [];

  private pathMatcher: PathMatcher;
  private componentDestroyed = new Subject<boolean>();

  constructor(router: Router,
              translate: TranslateService,
              authenticationService: AuthenticationService,
              log: LogService,
              private taskListService: TaskListService) {
    super(translate, router, authenticationService, log);
  }

  ngOnInit() {
    this.taskListService.getUncompletedTaskLists()
      .subscribe(taskLists => this.taskLists = taskLists, this.onServiceCallError.bind(this));
    this.taskListService.getUpdatedTaskList()
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe(taskList => this.onTaskListUpdate(taskList));
    this.taskListService.getDeletedTaskList()
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe(taskList => this.onTaskListDelete(taskList));

    this.pathMatcher = PathMatcher.fromUrlTree(this.router.parseUrl(this.router.url));

    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.onNavigationEnd(event);
      }
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next(true);
    this.componentDestroyed.complete();
  }

  isRouterLinkActive(path: string): boolean {
    return this.pathMatcher && this.pathMatcher.matches(path);
  }

  onTaskListFormModelNameChange() {
    this.taskListFormSubmitEnabled = !Strings.isBlank(this.taskListFormModel.name);
  }

  onTaskListFormSubmit() {
    this.createTaskList();
  }

  private onNavigationEnd(e: NavigationEnd) {
    this.pathMatcher = PathMatcher.fromUrlTree(this.router.parseUrl(e.url));
  }

  private createTaskList() {
    if (!Strings.isBlank(this.taskListFormModel.name)) {
      this.taskListService.createTaskList(this.taskListFormModel).subscribe(createdTaskList => {
        this.taskLists.push(createdTaskList);
        this.taskListForm.resetForm();
      }, this.onServiceCallError.bind(this));
    }
  }

  private onTaskListUpdate(updatedTaskList: TaskList) {
    const index = this.taskLists.findIndex(taskList => taskList.id === updatedTaskList.id);
    if (index >= 0) {
      this.taskLists[index] = updatedTaskList;
    }
  }

  private onTaskListDelete(deletedTaskList: TaskList) {
    const index = this.taskLists.findIndex(taskList => taskList.id === deletedTaskList.id);
    if (index >= 0) {
      this.taskLists.splice(index, 1);
    }
  }
}