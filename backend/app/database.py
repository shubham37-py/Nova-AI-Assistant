from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# 1. Define the SQLite database file location relative to the project root
SQLALCHEMY_DATABASE_URL = "sqlite:///./nova.db"

# 2. Create the SQLAlchemy engine
# Note: check_same_thread=False is strictly required for SQLite in multi-threaded 
# environments like FastAPI, as FastAPI handles requests across multiple threads.
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False}
)

# 3. Create a configured "SessionLocal" class
# Instances of this class will represent database sessions per request.
# - autocommit=False: Explicit transactions give us control over commits/rollbacks.
# - autoflush=False: Prevents premature flushing to DB before operations complete.
SessionLocal = sessionmaker(
    autocommit=False, 
    autoflush=False, 
    bind=engine
)

# 4. Create a Base class for ORM models
# Models in models.py will inherit from this Base class to register tables with SQLAlchemy.
Base = declarative_base()

# 5. Dependency to yield a database session per HTTP request
# Using a generator with try/finally ensures sessions are safely closed even if errors occur.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()