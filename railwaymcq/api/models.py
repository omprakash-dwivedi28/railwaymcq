from django.db import models

# Create your models here.
class plan (models.Model):
     item=models.CharField(max_length=500)

class Feedback(models.Model):
     name=models.CharField(max_length=500)
     zone=models.CharField(max_length=10)
     division=models.CharField(max_length=10)
     dept=models.CharField(max_length=20)
     date=models.DateField(auto_now_add=True)
     message=models.CharField(max_length=5000)
          
class Qbank(models.Model):
    report=models.IntegerField	
    subcode=models.IntegerField	
    topcode=models.IntegerField	
    validity=models.IntegerField	
    difficulty=models.IntegerField
    question=models.CharField(max_length=500)	
    agreereport=models.CharField(max_length=500)	
    option1=models.CharField(max_length=500)	
    option2=models.CharField(max_length=500)	
    option3=models.CharField(max_length=500)	
    option4=models.CharField(max_length=500)	
    answer=models.CharField(max_length=500)	
    Reference=models.CharField(max_length=500)	
    datetime=models.DateField(auto_now_add=True)	
    ip=models.CharField(max_length=20)

