from django.shortcuts import render
from rest_framework import generics

# Import the model and form.
from .models import StudentModel
from .serializers import StudentSerializer

# List Students from the database as well as post student to the database.
class StudentListCreateApiView(generics.ListCreateAPIView):
    queryset = StudentModel.objects.all()
    serializer_class = StudentSerializer

# List, update, and delete specific student from the database.
class StudentRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = StudentModel.objects.all()
    serializer_class = StudentSerializer
    
# Render the Frontend
def StudentsView(request):
    return render(request, 'our_student/students.html')
