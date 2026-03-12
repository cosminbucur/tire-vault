INSERT INTO public.mechanics (id, first_name, last_name)
VALUES 
  ('7b823e64-1234-4321-abcd-1234567890ab', 'Alex', 'Vasile'),
  ('8c934f75-5678-8765-bcde-0987654321ba', 'Vali', 'Marin')
ON CONFLICT (id) DO NOTHING;