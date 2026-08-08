from sqlalchemy.orm import Session

from app import models, schemas


def create_task(db: Session, task: schemas.TaskCreate):
    new_task = models.Task(
        title=task.title,
        description=task.description,
        priority=task.priority,
        category=task.category,
        due_date=task.due_date,
        due_time=task.due_time,
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


def get_tasks(db: Session, page: int, limit: int):
    offset = (page - 1) * limit

    return (
        db.query(models.Task)
        .order_by(
            models.Task.completed.asc(),
            models.Task.id.asc()
        )
        .offset(offset)
        .limit(limit)
        .all()
    )
    

def get_task(db: Session, task_id: int):
    return db.query(models.Task).filter(models.Task.id == task_id).first()

def update_task(db: Session, task_id: int, updated_task: schemas.TaskUpdate):
    task = get_task(db, task_id)

    if task is None:
        return None
    
    completed: bool

    task.title = updated_task.title
    task.description = updated_task.description
    task.priority = updated_task.priority
    task.category = updated_task.category
    task.due_date = updated_task.due_date
    task.due_time = updated_task.due_time
    task.completed = updated_task.completed

    db.commit()
    db.refresh(task)

    return task

def delete_task(db: Session, task_id: int):
    task = get_task(db, task_id)
    
    if task is None:
     return None
 
    db.delete(task)
    db.commit()
    
    return task 