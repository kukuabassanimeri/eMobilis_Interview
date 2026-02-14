from django.db import models

# Create student model
class StudentModel(models.Model):
    stud_no = models.CharField()
    stud_name = models.CharField(max_length=20)
    stud_age = models.IntegerField()
    course = models.CharField(max_length=50)
    
    def __str__(self):
        return f'{self.stud_name}'
