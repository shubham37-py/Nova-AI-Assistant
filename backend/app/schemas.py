from datetime import date, time, datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    priority: str = "Medium"
    category: Optional[str] = None
    due_date: Optional[date] = None
    due_time: Optional[time] = None
    

class TaskCreate(BaseModel):
    title: str
    description: str | None = None
    completed: bool = False
    priority: str
    category: str
    due_date: date | None = None
    due_time: time | None = None

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None
    priority: Optional[str] = None
    category: Optional[str] = None
    due_date: Optional[date] = None
    due_time: Optional[time] = None
    
class TaskResponse(TaskBase):
    id: int
    completed: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)