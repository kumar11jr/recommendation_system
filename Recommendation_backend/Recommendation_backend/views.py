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
        # Assuming you want to return the DataFrame data as JSON
        movies_data = movies_df.to_dict(orient="records")
        return JsonResponse(movies_data, safe=False)
    except FileNotFoundError:
        # Handle the case where the "movies.pkl" file is not found
        return JsonResponse({"error": "File not found"}, status=404)

