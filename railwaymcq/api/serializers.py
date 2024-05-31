from rest_framework import serializers
from .models import plan,Feedback,Qbank

class planSerializers(serializers.ModelSerializer):
    class Meta:
        model = plan
        fields =['id','item']


class FeedbackSerializers(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields =['id','name','zone','division','dept','date','message']

class QbankSerializers(serializers.ModelSerializer):
    class Meta:
        model = Qbank
        fields =['qcode','report','agreereport','subcode','topcode','validity','difficulty','question','option1','option2','option3','option4','answer','Reference','datetime','ip']



      