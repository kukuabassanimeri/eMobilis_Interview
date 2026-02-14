from .models import StudentModel
from rest_framework import serializers

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentModel
        
        fields = ['id', 'stud_no', 'stud_name', 'stud_age', 'course']