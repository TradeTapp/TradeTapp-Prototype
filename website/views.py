from django.shortcuts import render
from django.template import RequestContext
from django.shortcuts import render_to_response


def index(request):
    context = RequestContext(request)
    return render_to_response('index.html',{}, context)

def grid(request):
    context = RequestContext(request)
    return render_to_response('grid.html',{}, context)

def form(request):
    context = RequestContext(request)
    return render_to_response('form.html',{}, context)

def form2(request):
    context = RequestContext(request)
    return render_to_response('form2.html',{}, context)

def form3(request):
    context = RequestContext(request)
    return render_to_response('form3.html',{}, context)

def form4(request):
    context = RequestContext(request)
    return render_to_response('form4.html',{}, context)

def form5(request):
    context = RequestContext(request)
    return render_to_response('form5.html',{}, context)

def form6(request):
    context = RequestContext(request)
    return render_to_response('form6.html',{}, context)

def setup(request):
    context = RequestContext(request)
    return render_to_response('setup.html',{}, context)

# Create your views here.
