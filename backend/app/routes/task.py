from fastapi import APIRouter , Depends,HTTPException
from fastapi import Query

from sqlalchemy.orm import Session 
 
from app import crud , schemas
from app.database import get_db


router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)


@router.post(
    "/",
    response_model=schemas.TaskResponse,
    status_code=201
)
def create_new_task(
    task: schemas.TaskCreate,
    db: Session = Depends(get_db)
):
    return crud.create_task(db, task)



@router.get("/", response_model=list[schemas.TaskResponse])
def get_new_task(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    return crud.get_tasks(db, page, limit)

@router.get("/{task_id}", response_model=schemas.TaskResponse)
def get_task(
    task_id: int,
    db: Session = Depends(get_db)
):
    task = crud.get_task(db, task_id)

    if task is None:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    return task

@router.put("/{task_id}", response_model=schemas.TaskResponse)
def update_task(
    task_id: int,
    task: schemas.TaskUpdate,
    db: Session = Depends(get_db)
):
    updated_task = crud.update_task(db, task_id, task)

    if updated_task is None:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    return updated_task


@router.delete("/{task_id}", response_model=schemas.TaskResponse)
def delete_task(
    task_id: int,
    db: Session = Depends(get_db)
):
    deleted_task = crud.delete_task(db, task_id)

    if deleted_task is None:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    return deleted_task




    