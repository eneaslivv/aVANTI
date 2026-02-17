# AVANTI CMS - Configuración de Base de Datos Supabase

## 📋 Instrucciones de Configuración

### Paso 1: Ejecutar Schema SQL

1. Ve al **Supabase Dashboard**: https://supabase.com/dashboard/project/ukpnnviyfkxpnpwwdhut
2. Navega a **SQL Editor** (icono de base de datos en la barra lateral)
3. Copia el contenido de `schema.sql` y ejecútalo
4. Espera a que aparezca: `Schema created successfully!`

### Paso 2: Ejecutar Seed Data

1. En el mismo SQL Editor
2. Copia el contenido de `seed.sql` y ejecútalo
3. Espera a que aparezca el resumen con los conteos de datos insertados

### Paso 3: Verificar Tablas

Ejecuta esta consulta para verificar:

```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
```

Deberías ver:
- blog_posts
- media
- messages
- pages
- services
- system_config

### Paso 4: Verificar Datos

```sql
SELECT COUNT(*) as services FROM services;
SELECT COUNT(*) as posts FROM blog_posts;
SELECT COUNT(*) as pages FROM pages;
```

## 🔐 Row Level Security (RLS)

El schema incluye políticas de seguridad:

| Tabla | Lectura Pública | Escritura |
|-------|-----------------|-----------|
| pages | ✅ Si is_published | 🔐 Autenticados |
| services | ✅ Si is_active | 🔐 Autenticados |
| blog_posts | ✅ Si is_published | 🔐 Autenticados |
| messages | ❌ | ✅ Cualquiera puede enviar |
| media | ✅ | 🔐 Autenticados |

## ⚠️ Troubleshooting

### Error: "relation does not exist"
- Asegúrate de ejecutar `schema.sql` PRIMERO
- Ejecuta `seed.sql` DESPUÉS

### Error: "permission denied"
- RLS está habilitado
- Para desarrollo, puedes deshabilitar temporalmente:
```sql
ALTER TABLE public.services DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.media DISABLE ROW LEVEL SECURITY;
```

### Frontend no carga datos
1. Verifica `.env.local` tiene las credenciales correctas
2. Reinicia el servidor de desarrollo: `npm run dev`
3. Revisa la consola del navegador para errores
