from django.urls import path
app_name = 'our_student'

from . import views

urlpatterns = [
    
    # API Views
    path('student-list/', views.StudentListApiView.as_view(), name='student-list'),
    path('student/create/', views.StudentCreateAPIView.as_view(), name='student-create'),
    path('student/<int:pk>/', views.StudentRetrieveUpdateDestroyAPIView.as_view(), name='stduent-rud'),
    
    # Render the frontend view
    path('students/', views.StudentsView, name='students')
]