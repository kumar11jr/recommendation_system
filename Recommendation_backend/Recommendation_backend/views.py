from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import pickle
import pandas as pd


def recommend(movie):
    movie_index = movies_df[movies_df["title"] == movie].index[0]
    distances = similarity[movie_index]
    movies_list = sorted(list(enumerate(distances)),reverse=True,key=lambda x:x[1])[1:10]

    recommended_movies = []
    for i in movies_list:
        recommended_movies.append(movies_df.iloc[i[0]].title)
    return recommended_movies



@csrf_exempt
def ml(request):
    data = request.POST.get('data')
    recommendation = recommend(data)
    # print(recommendation)
    # print("hello")
    return JsonResponse(recommendation,safe=False)


# loading models && dataframes
movies_df = pd.read_pickle("movies.pkl")
movies_data = movies_df.to_dict(orient="records")
similarity = pickle.load(open('similarity.pkl',"rb"))


def load_movies(request):
    try:
        # print(movies_df)
        return JsonResponse(movies_data, safe=False)
    except FileNotFoundError:
        return JsonResponse({"error": "File not found"}, status=404)

