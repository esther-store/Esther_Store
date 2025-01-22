from django.core.files.uploadedfile import SimpleUploadedFile

def get_image(img_url):
        try:
            with open(img_url, 'rb') as img_file:
                img_content = img_file.read()
                return SimpleUploadedFile(name='test_image.png', content=img_content, content_type='image/png')
        except Exception as e:
            print(e)
            return "" 