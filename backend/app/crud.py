from sqlalchemy.orm import Session

from app import models, schemas


def create_task(db: Session, task: schemas.TaskCreate):
    new_task = models.Task(
        title=task.title,
        description=task.description,
        completed=task.completed,
        priority=task.priority,
        category=task.category,
        due_date=task.due_date,
        due_time=task.due_time,
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


def get_tasks(
    db: Session,
    page: int,
    limit: int,
    completed: bool | None = None
):
    offset = (page - 1) * limit

    query = db.query(models.Task)

    if completed is not None:
        query = query.filter(models.Task.completed == completed)

    return (
        query
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

def update_task(db: Session, task_id: int, task: schemas.TaskUpdate):
    db_task = (
        db.query(models.Task)
        .filter(models.Task.id == task_id)
        .first()
    )

    if not db_task:
        return None

    update_data = task.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(db_task, field, value)

    db.commit()
    db.refresh(db_task)

    return db_task

def delete_task(db: Session, task_id: int):
    task = get_task(db, task_id)
    
    if task is None:
     return None
 
    db.delete(task)
    db.commit()
    
    return task 