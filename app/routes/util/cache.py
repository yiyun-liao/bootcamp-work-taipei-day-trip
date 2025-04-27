# self.data = [最舊的資料, 舊的資料, 新的資料, 最新的資料]
# 資料 {"key":鍵, "value":值}
class Cache():
    def __init__(self):
        self.data = []
        self.max = 20
    def get(self, key):
        for i in range(len(self.data) -1, -1, -1):
            if self.data[i]["key"] == key:
                # 放置到「最新的資料」的位置，並且回傳「值」
                item = self.data[i]
                del self.data[i]
                self.data.append(item)
                print("Cache hits")
                return item["value"]
            # 如果整個回圈都沒抓到資料
        print("Cache misses")
        return None
    def put(self, key, value):
        if len(self.data) > self.max:
            self.data = self.data[self.max//2:] #將 cache 資料減半
        self.data.append({
            "key":key,
            "value":value
        })
        print("Cache saves")
cache = Cache()