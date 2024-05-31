from django.urls import path
from . import views
urlpatterns = [
          path('plan/list/',views.planList.as_view()),
           path('plan/create/',views.planCreate.as_view()),
          path('plan/delete/<int:id>',views.planDestroy.as_view()),

          # for feedback pages
        path('Feedback/list/',views.FeedbackList.as_view()),
        path('Feedback/create/',views.FeedbackCreate.as_view()),
        path('Feedback/delete/<int:id>',views.FeedbackDestroy.as_view()),
        # path('flist/',views.FeedbackList.as_view()),
#         path('fcreate/',views.FeedbackCreate.as_view()),
#         path('fdelete/<int:id>',views.FeedbackDestroy.as_view()),

        
   ]
