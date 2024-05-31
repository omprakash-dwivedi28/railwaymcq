from django.contrib import admin
from .models import plan,Feedback,Qbank

# Register your models here.
@admin.register(plan)
class planModelAdmin(admin.ModelAdmin):
    list_display=['id','item']

@admin.register(Feedback)
class FeedbackModelAdmin(admin.ModelAdmin):
    feedback_display=['id','name','zone','division','dept','date','message']

@admin.register(Qbank)
class QbankModelAdmin(admin.ModelAdmin):
    Qbank_display=['qcode','report','agreereport','subcode','topcode','validity','difficulty','question','option1','option2','option3','option4','answer','Reference','datetime','ip']


