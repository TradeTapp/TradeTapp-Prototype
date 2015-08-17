from django.shortcuts import render
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.http import Http404
from django.http import HttpResponse


def staticpage(request, page_name):
    try:
        context = RequestContext(request)
        return render_to_response(page_name ,{},context)
    except:
        raise Http404