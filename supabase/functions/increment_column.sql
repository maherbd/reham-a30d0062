
CREATE OR REPLACE FUNCTION public.increment_column(
  table_name text,
  column_name text,
  record_id_column text,
  record_id uuid,
  amount int DEFAULT 1
)
RETURNS int
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_val int;
  new_val int;
  query text;
BEGIN
  -- Construct the query dynamically
  query := format('SELECT %I FROM %I WHERE %I = %L', 
                  column_name, table_name, record_id_column, record_id);
  
  -- Get the current value
  EXECUTE query INTO current_val;
  
  -- Set to 0 if null
  current_val := COALESCE(current_val, 0);
  
  -- Calculate the new value
  new_val := current_val + amount;
  
  -- Update the record
  query := format('UPDATE %I SET %I = %s WHERE %I = %L', 
                  table_name, column_name, new_val, record_id_column, record_id);
  EXECUTE query;
  
  RETURN new_val;
END;
$$;

COMMENT ON FUNCTION public.increment_column IS 'Safely increments a numeric column value for a specific record';
