from django.shortcuts import render
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.http import Http404
from django.http import HttpResponse


def staticpage(request, page_name):
    print request
    print page_name
    try:
        context = RequestContext(request)
        print context
        return render_to_response(page_name ,{},context)
        #return render(request, page_name)
    except:
        raise Http404