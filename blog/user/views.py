# Create your views here.
import datetime

import bcrypt
import jwt
import simplejson
from django.http import HttpRequest, HttpResponseBadRequest, JsonResponse, HttpResponse

from blog import settings
from .models import User

AUTH_EXPIRE = 8 * 60 * 60


# token过期认证装饰器
def authenticate(view):
    def wrapper(request:HttpRequest):
        # 获取jwt认证信息
        payload = request.META.get('HTTP_JWT')
        print('[PAYLOAD(HTTP_JWT)]', payload)
        if not payload:
            return HttpResponse(status=401)

        try:
            payload = jwt.decode(payload, settings.SECRET_KEY, algorithms=['HS256'])
            print('[PAYLOAD]', payload)
        except Exception:
            return HttpResponse(status=401)

        try:
            user_id = payload.get('user_id', -1)
            user = User.objects.filter(pk=user_id).get()
            request.user = user
        except Exception as e:
            print(e)
            return HttpResponse(status=401)

        return view(request)
    return wrapper


def gen_token(user_id):
    d = {
        'user_id': user_id,
        # 声明过期时间 exp类型必须为int时间戳 解码时会自动验证是否过期
        'exp': int(datetime.datetime.now().timestamp()) + AUTH_EXPIRE
    }
    return jwt.encode(d, settings.SECRET_KEY, 'HS256').decode()


def reg(request: HttpRequest):
    # print('[POST]', request.POST)
    # print('[BODY]', request.body)
    payload = simplejson.loads(request.body) # POST提交的表单内容

    try:
        email = payload['email']
        query = User.objects.filter(email=email)
        print('[QUERY]', query)
        print('[QUERY.QUERY]', query.query)
        # 验证邮箱是否已存在
        if query.first():
            return HttpResponseBadRequest('该邮箱已注册')
        name = payload['name']
        # 将密码用密文保存
        password = bcrypt.hashpw(payload['password'].encode(), bcrypt.gensalt())
        print('[CONTENT]', email, name, password)

        # 将用户信息存入数据库
        user = User()
        user.email = email
        user.name = name
        user.password = password

        try:
            user.save()
            print('=====SAVED=====')
            return JsonResponse({'token': gen_token(user.id)})
        except Exception:
            raise

    except Exception as e:
        print(e)
        return HttpResponseBadRequest('注册失败')


def login(request:HttpRequest):
    payload = simplejson.loads(request.body) # email + password
    try:
        email = payload['email']
        user = User.objects.filter(email=email).get() # 表中的一条记录
        print('[USER]', user)

        if bcrypt.checkpw(payload['password'].encode(), user.password.encode()):
            token = gen_token(user.id)
            print('[TOKEN]', token)
            res = JsonResponse({
                'user':{
                    'user_id':user.id,
                    'name':user.name,
                    'email':user.email
                },'token':token
            })
            # 将token以cookie形式返回
            res.set_cookie('Jwt', token)
            return res
        else:
            return HttpResponseBadRequest('登录失败')
    except Exception as e:
        print(e)
        return HttpResponseBadRequest('登录失败')


def show(request:HttpRequest):
    print(1, request.GET)
    print(2, request.POST)
    print(3, request.body)
    res = JsonResponse({'t1':1000})
    res['Access-Control-Allow-Origin'] = '*'
    return res
