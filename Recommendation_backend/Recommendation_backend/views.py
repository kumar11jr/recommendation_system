from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import pickle
import pandas as pd
import requests

def poster(id):
    response = requests.get('https://api.themoviedb.org/3/movie/{}?api_key=6bd193f75eef0a63139a2d1276bc47e5'.format(id))
    data = response.json()
    # print(data['poster_path'])
    # print("hii")
    return 'https://image.tmdb.org/t/p/w780'+ data['poster_path']



def recommend(movie):
    movie_index = movies_df[movies_df["title"] == movie].index[0]
    distances = similarity[movie_index]
    movies_list = sorted(list(enumerate(distances)),reverse=True,key=lambda x:x[1])[1:6]

    recommended_movies = []
    posters = []
    # poster(11)
    # print(movies_df)
    for i in movies_list:
        id = movies_df.iloc[i[0]].id
        # print(id)
        # print()
        recommended_movies.append(movies_df.iloc[i[0]].title)
        posters.append(poster(id))
        # print(posters)
    return recommended_movies,posters



@csrf_exempt
def ml(request):
    data = request.POST.get('data')
    recommendation = recommend(data)
    return JsonResponse(recommendation,safe=False)


# loading models && dataframes
movies_df = pd.read_pickle("movies.pkl")
movies_data = movies_df.to_dict(orient="records")
similarity = pickle.load(open('similarity.pkl',"rb"))


def load_movies(request):
    try:
        return JsonResponse(movies_data, safe=False)
    except FileNotFoundError:
        return JsonResponse({"error": "File not found"}, status=404)

