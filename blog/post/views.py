import math
from datetime import datetime, timezone, timedelta

import simplejson
from django.http import HttpRequest, HttpResponseBadRequest, JsonResponse, HttpResponseNotFound

from user.views import authenticate
from .models import Post, Content


# Create your views here.


@authenticate
def pub(request: HttpRequest):
    # 博客提交页面 需提交内容为'title', 'content'
    post = Post()
    content = Content()

    try:
        payload = simplejson.loads(request.body)
        post.title = payload['title']
        post.author = request.user  # 若认证成功则通过装饰器注入
        post.postdate = datetime.now(timezone(timedelta(hours=8)))
        post.save()
        content.content = payload['content']
        content.post = post  # 一对一类型直接使用表实例即可
        content.save()
        return JsonResponse({'post_id':post.id})

    except Exception as e:
        print(e)
        return HttpResponseBadRequest()


def get(request:HttpRequest, post_id):

    try:
        post_id = int(post_id)
        post = Post.objects.get(id=post_id)
        print('[POST]', post)
        if post:
            return JsonResponse({
                'post':{
                    'post_id':post.id,
                    'title':post.title,
                    'author':post.author.name,
                    'author_id':post.author.id,
                    'postdate':post.postdate.timestamp(),
                    'content':post.content.content
                }
            })

    except Exception as e:
        print(e)
        return HttpResponseNotFound()


def getall(request:HttpRequest):

    try:
        page = int(request.GET.get('page', 1))
        page = page if page > 0 else 1
    except:
        page = 1

    try:  # 每页显示的博客数量
        size = int(request.GET.get('size', 10))
        size = size if (0 < size < 100) else 10
    except:
        size = 10

    try:
        start = (page - 1) * size
        posts = Post.objects.order_by('-id')  # 负号表示倒序
        count = posts.count()  # 总博客数
        posts = posts[start : start + size]
        return JsonResponse({
            'posts':[{'post_id':post.id, 'title':post.title} for post in posts],
            'pagination':{'page':page, 'size':size, 'count':count, 'pages':math.ceil(count/size)}
        })
    except Exception as e:
        print(e)
        return HttpResponseBadRequest()