from django.shortcuts import render
from rest_framework import generics

# Import the model and form.
from .models import StudentModel
from .serializers import StudentSerializer

# List Students from the database.
class StudentListApiView(generics.ListAPIView):
    queryset = StudentModel.objects.all()
    serializer_class = StudentSerializer

# Add  students to the database.
class StudentCreateAPIView(generics.CreateAPIView):
    queryset = StudentModel.objects.all()
    serializer_class = StudentSerializer

# List, update, and delete specific student from the database.
class StudentRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = StudentModel.objects.all()
    serializer_class = StudentSerializer
    
# Render the Frontend
def StudentsView(request):
    return render(request, 'our_student/students.html')
