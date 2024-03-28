from typing import Optional, Union
import datetime

class User:
    def __init__(
            self,
            name: str,
            birthdate: Union[str, datetime.datetime],
            email:str,
            password,
            gender:Optional[str]
        ):
        self.name = name
        self.birthdate = birthdate
        self.email = email
        self.password = password
        self.gender = gender