from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def ml(request):
    data = request.POST.get('data')
    print(data)
    return JsonResponse({'result':'result'})

