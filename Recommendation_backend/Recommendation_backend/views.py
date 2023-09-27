from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import pickle
import pandas as pd

@csrf_exempt
def ml(request):
    data = request.POST.get('data')
    print(data)
    return JsonResponse({'result':'result'})


def load_movies(request):
    try:
        movies_df = pd.read_pickle("movies.pkl")
        movies_data = movies_df.to_dict(orient="records")
        return JsonResponse(movies_data, safe=False)
    except FileNotFoundError:
        return JsonResponse({"error": "File not found"}, status=404)

