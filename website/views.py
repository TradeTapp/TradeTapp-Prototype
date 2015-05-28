from django.shortcuts import render
from django.template import RequestContext
from django.shortcuts import render_to_response


def index(request):
    context = RequestContext(request)
    return render_to_response('index.html',{}, context)

# Create your views here.