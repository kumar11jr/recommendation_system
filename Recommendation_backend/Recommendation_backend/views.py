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
        with open('movies.pkl', 'rb') as file:
            movies_list = pickle.load(file)
            movies = pd.DataFrame(movies_list)
            print(movies)
            movie_titles = [movie['title'] for movie in movies]
            print(movie_titles)
            return JsonResponse(movie_titles, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)



