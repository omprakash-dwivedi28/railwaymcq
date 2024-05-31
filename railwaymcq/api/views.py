
from .serializers import planSerializers,FeedbackSerializers
from .models import plan,Feedback
from rest_framework.generics import ListAPIView,CreateAPIView,DestroyAPIView
# Create your views here.

class planList(ListAPIView):
    queryset=plan.objects.all()
    serializer_class=planSerializers

class planCreate(CreateAPIView):
    queryset=plan.objects.all()
    serializer_class=planSerializers

class planDestroy(DestroyAPIView):
    queryset=plan.objects.all()
    serializer_class=planSerializers
    lookup_field='id'


    # Creating view for feedback pages

class FeedbackList(ListAPIView):
    queryset=Feedback.objects.all()
    serializer_class=FeedbackSerializers

class FeedbackCreate(CreateAPIView):
    queryset=Feedback.objects.all()
    serializer_class=FeedbackSerializers

class FeedbackDestroy(DestroyAPIView):
    queryset=Feedback.objects.all()
    serializer_class=FeedbackSerializers
    lookup_field='id'

