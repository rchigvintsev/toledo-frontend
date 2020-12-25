import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';
import {HttpTestingController} from '@angular/common/http/testing';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';

import {of} from 'rxjs';

import {TranslateService} from '@ngx-translate/core';

import {TestSupport} from '../../test/test-support';
import {TaskListTasksComponent} from './task-list-tasks.component';
import {ConfigService} from '../../service/config.service';
import {TaskService} from '../../service/task.service';
import {TaskListService} from '../../service/task-list.service';
import {PageRequest} from '../../service/page-request';
import {Task} from '../../model/task';
import {TaskGroup} from '../../model/task-group';
import {TaskList} from '../../model/task-list';
import any = jasmine.any;

const CURRENT_LANG = 'en';

class MatDialogMock {
  open() {
    return {
      afterClosed: () => of({result: true})
    };
  }
}

describe('TaskListTasksComponent', () => {
  const taskList = new TaskList().deserialize({id: 1, name: 'Test task list'});

  let component: TaskListTasksComponent;
  let fixture: ComponentFixture<TaskListTasksComponent>;
  let httpMock: HttpTestingController;
  let router: Router;
  let taskService: TaskService;
  let taskListService: TaskListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: TestSupport.IMPORTS,
      declarations: TestSupport.DECLARATIONS,
      providers: [
        {provide: MatDialog, useClass: MatDialogMock},
        {provide: ConfigService, useValue: {apiBaseUrl: 'http://backend.com'}},
        {provide: ActivatedRoute, useValue: {params: of([{id: 1}])}}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListTasksComponent);
    component = fixture.componentInstance;

    const injector = getTestBed();

    const translateService = injector.get(TranslateService);
    translateService.currentLang = CURRENT_LANG;

    httpMock = injector.get(HttpTestingController);

    router = injector.get(Router);
    router.navigate = jasmine.createSpy('navigate').and.callFake(() => Promise.resolve());

    const tasks = [
      new Task().deserialize({id: 2, taskListIdL: taskList.id, title: 'Task 1'}),
      new Task().deserialize({id: 3, taskListIdL: taskList.id, title: 'Task 2'})
    ];

    taskListService = injector.get(TaskListService);
    spyOn(taskListService, 'getTaskList').and.returnValue(of(taskList));
    spyOn(taskListService, 'getTasks').and.returnValue(of(tasks));
    spyOn(taskListService, 'updateTaskList').and.callFake(t => of(t));

    taskService = injector.get(TaskService);
    spyOn(taskService, 'createTask').and.callFake(task => of(task.clone()));

    const translate = injector.get(TranslateService);
    translate.currentLang = 'en';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load next task page on task list scroll', () => {
    fixture.whenStable().then(() => {
      component.onTaskListScroll();
      expect(taskListService.getTasks).toHaveBeenCalledWith(any(Number), new PageRequest(1));
    });
  });

  it('should undo changes in title on title input escape keydown', () => {
    fixture.whenStable().then(() => {
      component.title = 'New name';
      component.onTitleInputEscapeKeydown();
      fixture.detectChanges();
      expect(component.title).toEqual(taskList.name);
    });
  });

  it('should save task list on title input blur', () => {
    fixture.whenStable().then(() => {
      component.title = 'New name';
      component.onTitleInputBlur();
      fixture.detectChanges();
      expect(taskListService.updateTaskList).toHaveBeenCalled();
    });
  });

  it('should not save task list with blank name', () => {
    fixture.whenStable().then(() => {
      component.title = ' ';
      component.onTitleInputBlur();
      fixture.detectChanges();
      expect(taskListService.updateTaskList).not.toHaveBeenCalled();
    });
  });

  it('should delete task list', () => {
    spyOn(taskListService, 'deleteTaskList').and.returnValue(of());
    fixture.whenStable().then(() => {
      component.onDeleteTaskListButtonClick();
      fixture.detectChanges();
      expect(taskListService.deleteTaskList).toHaveBeenCalled();
    });
  });

  it('should navigate to "tasks-for-today" on task list delete', () => {
    component.onDeleteTaskListButtonClick();
    httpMock.expectOne(`${taskListService.baseUrl}/${taskList.id}`).flush(null);
    expect(router.navigate).toHaveBeenCalledWith([CURRENT_LANG, 'task'], {fragment: TaskGroup.TODAY.value});
  });

  it('should put new task on current task list', () => {
    const taskTitle = 'New task';
    fixture.whenStable().then(() => {
      component.taskFormModel.title = taskTitle;
      component.onTaskFormSubmit();
      fixture.detectChanges();
      expect(component.tasks.length).toBe(3);
      expect(component.tasks[2].title).toBe(taskTitle);
      expect(component.tasks[2].taskListId).toBe(taskList.id);
    });
  });
});