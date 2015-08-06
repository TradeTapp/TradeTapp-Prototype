from django.conf.urls import include, url
from django.contrib import admin
from website import views
from django.views.generic.base import TemplateView


urlpatterns = [
url('^$',  TemplateView.as_view(template_name='index.html')),
url('^(.*)$', views.staticpage, name='staticpage'),
]