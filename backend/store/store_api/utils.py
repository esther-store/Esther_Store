from django.core.files.uploadedfile import SimpleUploadedFile

def get_image(img_url):
        try:
            with open(img_url, 'rb') as img_file:
                img_content = img_file.read()
                return SimpleUploadedFile(name='test_image.png', content=img_content, content_type='image/png')
        except Exception as e:
            return "" 

def generate_product_keywords(product):
    keywords = []

    if product.product_name:
        keywords.extend(product.product_name.lower().split())

    if product.product_description:
        keywords.extend(product.product_description.lower().split())
    
    if product.categoria and product.categoria.nombre:
        keywords.append(product.categoria.nombre.lower())
    
    if product.promotion and product.promotion.name:
        keywords.append(product.promotion.name.lower())

    if product.promotion and product.promotion.description:
        keywords.append(product.promotion.description.lower())
    
    return " ".join(set(keywords))            