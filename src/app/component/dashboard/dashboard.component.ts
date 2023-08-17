import { Component, OnInit } from '@angular/core';
import { Task } from "../../model/task"
import { CrudService } from '../../service/crud.service';


type Tasks={
  task: Task;
  isEditing:boolean
  editVal:string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj: Task =new Task();
  // etask:Tasks ={task:this.taskObj,isEditing:false,editVal:''}
  tasks: Tasks[] = [];
  taskVal:string = '';
  // isEditing=false;
  // editVal='';

  constructor(private crudService: CrudService){

  }

  ngOnInit(): void {
    this.taskObj =new Task();
    this.tasks = [];
    this.getAlltask();
  }

  addTask(){
    this.taskObj.task_name=this.taskVal;
    this.crudService.addTask(this.taskObj).subscribe({
      next: (res: Task) => {
        this.ngOnInit();
        this.taskVal='';
      },
      error: (err) => {
        alert(err);
      }
    });
  }

  getAlltask(){
    this.crudService.getAllTask().subscribe({
      next: (res)=>{
        this.tasks = res.map(task => ({ task, isEditing: false, editVal: '' }));
      },
      error:(err)=>{
        alert("Unable to get tasks")
      }
    })

  }

  editTask(task:Tasks){
    this.taskObj=task.task
    this.taskObj.task_name=task.editVal;
    this.crudService.editTask(this.taskObj).subscribe({
      next:(res)=>{
      this.ngOnInit();
      task.editVal=''
      task.isEditing=!task.isEditing;
      },
      error:(err)=>{

      }
    })
  }

  deleteTask(task:Tasks){
    this.crudService.deleteTask(task.task).subscribe({
      next:(res)=>{
        this.ngOnInit()
      },
      error:()=>{
        alert("Unable to delete")
      }
    })
  }

  editing(task:Tasks){
    task.isEditing = !task.isEditing;
    task.editVal = task.isEditing ? task.task.task_name : '';


}
}
