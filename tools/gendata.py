import os
import random
import json
import shutil

images_dir = os.path.dirname(os.path.realpath(__file__))
print(images_dir)
brands = ["LI-NING", "FAKEONE", "NEWSTAR"]
adaptFors = [["men"], ["women"], ["men", "women"]]
id = 0

data = []
for d in os.listdir(images_dir):
    if os.path.isdir(f'{images_dir}{os.sep}{d}'):
        id += 1
        clothes = {
            "id": id,
            "name": d,
            "description": d,
            "brand": brands[id % 3],
            "category": "fashion",
            "adaptFor": adaptFors[id % 3],
            "pictures": [],
            "price": random.randint(100, 3000)
        }
        for f in os.listdir(f'{images_dir}{os.sep}{d}'):
            ext = f.split('.')[-1]
            if (ext in ['jpg', 'jpeg', 'png']):
                shutil.copyfile(f'{images_dir}{os.sep}{d}{os.sep}{f}', f'{images_dir}{os.sep}{f}')
                clothes["pictures"].append(f)
        data.append(clothes)
print(json.dumps(data, indent=2))
