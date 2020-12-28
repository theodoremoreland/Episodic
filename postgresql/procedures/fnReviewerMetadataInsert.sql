CREATE OR REPLACE FUNCTION "fnReviewerMetadataInsert"(
  _metadata jsonb,
  _email text)
    RETURNS void
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
DECLARE _reviewer_id integer;

BEGIN
  _reviewer_id = (select reviewer_id from reviewers where emailaddress = _email);

  UPDATE reviewer_metadata
  SET active = FALSE
  WHERE active = TRUE
    AND reviewer_metadata.reviewer_id = _reviewer_id;
    
  INSERT INTO reviewer_metadata(reviewer_id, metadata, active)
  VALUES(_reviewer_id,  _metadata, TRUE);
END;
$BODY$;