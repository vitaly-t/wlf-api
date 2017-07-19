INSERT INTO marks (
  element_id,
  mark_type,
  mark_id,
  mark_color,
  mark_location,
  date_given,
  date_removed,
  notes
)
VALUES ${val:raw}
ON CONFLICT (element_id, mark_id, mark_location)
DO UPDATE SET
  mark_type = EXCLUDED.mark_type,
  mark_id = EXCLUDED.mark_id,
  mark_color = EXCLUDED.mark_color,
  mark_location = EXCLUDED.mark_location,
  date_given = EXCLUDED.date_given,
  date_removed = EXCLUDED.date_removed,
  notes = EXCLUDED.notes;
