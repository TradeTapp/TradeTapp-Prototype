from django.conf.urls import include, url
from django.contrib import admin
from website import views

urlpatterns = [
        url(r'^$', views.index, name='index'),
        url(r'^grid$', views.grid, name='grid'),
        url(r'^form$', views.form, name='form'),
        url(r'^form2$', views.form2, name='form2'),
        url(r'^form3$', views.form3, name='form3'),
        url(r'^form4$', views.form4, name='form4'),
        url(r'^form5$', views.form5, name='form5'),
        url(r'^form6$', views.form6, name='form6'),
]