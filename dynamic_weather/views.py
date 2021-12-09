from django.shortcuts import render
from django.http import JsonResponse
import json # learn this
import urllib.request # read and learn this
# import time


def index(request):
    if request.method == 'POST':
        city = request.POST.get('city')
        try:
            query_result = urllib.request.urlopen(f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid=52fe9d01b61b57d0ac6b817b7fb318b4").read()
            json_data = json.loads(query_result)# This converts 'query_result' into a python object

            context = {
                "success": True,
                "country_code": json_data['sys']['country'],
                "coordinate": str(json_data['coord']['lon']) + "  " + str(json_data['coord']['lat']),
                "temp": str(json_data['main']['temp']) + 'k',
                "pressure": json_data['main']['pressure'],
                "humidity": json_data['main']['humidity'],
                "weather": json_data['weather'][0]['main'],
                "description": json_data['weather'][0]['description'],
                "city": city
            }
            return JsonResponse(context)

        except Exception:
            # time.sleep(5)
            return JsonResponse({"success": False})

    else:
        return render(request, 'base.html')

# Create your views here.
