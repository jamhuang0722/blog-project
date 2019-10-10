import glob
from distutils.core import setup

setup(name='Blog',
      version='1.0',
      description='Blog Project',
      author='Jam Huang',
      author_email='viya20170728@gmail.com',
      url='http://www.viya.com',
      packages=['blog', 'post', 'user'],
      py_modules=['manage'],
      data_files=glob.glob('templates/*.html') + ['requirements']
     )