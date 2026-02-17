-- ============================================
-- AVANTI CMS - STORAGE SETUP
-- Ejecutar en Supabase SQL Editor
-- ============================================

-- 1. Crear el bucket 'images' si no existe
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Habilitar RLS en storage.objects (generalmente ya está habilitado)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 3. Política: Acceso público de lectura para el bucket 'images'
DROP POLICY IF EXISTS "Public access to images" ON storage.objects;
CREATE POLICY "Public access to images" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

-- 4. Política: Los usuarios autenticados pueden subir imágenes
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
CREATE POLICY "Authenticated users can upload images" ON storage.objects
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated' AND 
    bucket_id = 'images'
  );

-- 5. Política: Los usuarios autenticados pueden actualizar/borrar sus imágenes
DROP POLICY IF EXISTS "Authenticated users can manage images" ON storage.objects;
CREATE POLICY "Authenticated users can manage images" ON storage.objects
  FOR ALL USING (
    auth.role() = 'authenticated' AND 
    bucket_id = 'images'
  );

SELECT 'Storage configured successfully!' as result;
