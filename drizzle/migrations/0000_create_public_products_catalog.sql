CREATE TABLE public.products (
  slug text PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('household', 'laundry', 'personal', 'auto')),
  sort_order integer NOT NULL,
  prices jsonb NOT NULL DEFAULT '[]'::jsonb,
  featured jsonb
);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are publicly readable" ON public.products FOR SELECT TO anon, authenticated USING (true);
INSERT INTO public.products (slug, name, category, sort_order, prices, featured) VALUES
('dish-washing-liquid', 'Dish Washing Liquid', 'household', 1, '[{"size":"1 Litre","amountCents":2500},{"size":"5 Litres","amountCents":11000},{"size":"20 Litres","amountCents":40000}]'::jsonb, '{"size":"1 Litre","imageIndex":0}'::jsonb),
('fabric-softener', 'Fabric Softener', 'laundry', 2, '[{"size":"1 Litre","amountCents":3000},{"size":"5 Litres","amountCents":12000},{"size":"25 Litres","amountCents":52000}]'::jsonb, '{"size":"1 Litre","imageIndex":2}'::jsonb),
('handy-andy', 'Handy Andy', 'household', 3, '[{"size":"1 Litre","amountCents":2500},{"size":"5 Litres","amountCents":11000},{"size":"20 Litres","amountCents":35000}]'::jsonb, NULL),
('tile-cleaner', 'Tile Cleaner', 'household', 4, '[{"size":"1 Litre","amountCents":2500},{"size":"5 Litres","amountCents":10000},{"size":"20 Litres","amountCents":35000}]'::jsonb, NULL),
('hair-body-wash', 'Hair & Body Wash', 'personal', 5, '[{"size":"1 Litre","amountCents":3500},{"size":"5 Litres","amountCents":14000},{"size":"20 Litres","amountCents":43000}]'::jsonb, NULL),
('bubble-bath', 'Bubble Bath', 'personal', 6, '[{"size":"500ml","amountCents":2500},{"size":"1 Litre","amountCents":4000},{"size":"5 Litres","amountCents":14500}]'::jsonb, NULL),
('shower-gel', 'Shower Gel', 'personal', 7, '[{"size":"1 Litre","amountCents":3500},{"size":"5 Litres","amountCents":14000}]'::jsonb, NULL),
('air-fresheners', 'Air Fresheners', 'household', 8, '[{"size":"Sweet Cherry 200ml","amountCents":2000},{"size":"Smoke Busta 200ml","amountCents":2500},{"size":"Lavender 200ml","amountCents":2500}]'::jsonb, NULL),
('car-shampoo', 'Car Shampoo', 'auto', 9, '[{"size":"1 Litre","amountCents":3000},{"size":"5 Litres","amountCents":13000}]'::jsonb, NULL),
('madubula-js-fluid', 'Madubula J''s Fluid', 'auto', 10, '[{"size":"500ml","amountCents":2000},{"size":"5 Litres","amountCents":16000}]'::jsonb, NULL),
('multipurpose-cleaner', 'Multipurpose Cleaner', 'household', 11, '[{"size":"1 Litre","amountCents":2500},{"size":"5 Litres","amountCents":11000}]'::jsonb, NULL),
('tyre-shine', 'Tyre Shine', 'auto', 12, '[{"size":"500ml","amountCents":2500},{"size":"1 Litre","amountCents":4500},{"size":"5 Litres","amountCents":21500}]'::jsonb, '{"size":"500ml","imageIndex":3}'::jsonb),
('dashboard-polish', 'Dashboard Polish', 'auto', 13, '[{"size":"500ml","amountCents":3000},{"size":"1 Litre","amountCents":5000},{"size":"5 Litres","amountCents":23000}]'::jsonb, NULL),
('bleach', 'Bleach', 'household', 14, '[{"size":"1 Litre","amountCents":2500},{"size":"5 Litres","amountCents":7000},{"size":"25 Litres","amountCents":30000}]'::jsonb, NULL),
('thick-bleach', 'Thick Bleach', 'household', 15, '[{"size":"1 Litre","amountCents":2500},{"size":"5 Litres","amountCents":8000},{"size":"20 Litres","amountCents":32000}]'::jsonb, NULL),
('pine-gel', 'Pine Gel', 'household', 16, '[{"size":"500ml","amountCents":2000},{"size":"5 Litres","amountCents":13000},{"size":"20 Litres","amountCents":55000}]'::jsonb, '{"size":"500ml","imageIndex":1}'::jsonb),
('liquid-hand-soap', 'Liquid Hand Soap', 'personal', 17, '[{"size":"1 Litre","amountCents":4500},{"size":"5 Litres","amountCents":15000},{"size":"20 Litres","amountCents":35000}]'::jsonb, NULL),
('laundry-washing-powder', 'Laundry Washing Powder', 'laundry', 18, '[{"size":"500g","amountCents":2500},{"size":"5kg","amountCents":20000},{"size":"10kg","amountCents":35000}]'::jsonb, NULL),
('fabric-stain-remover', 'Fabric Stain Remover', 'laundry', 19, '[{"size":"1 Litre","amountCents":3000},{"size":"5 Litres","amountCents":14000},{"size":"20 Litres","amountCents":45000}]'::jsonb, NULL);