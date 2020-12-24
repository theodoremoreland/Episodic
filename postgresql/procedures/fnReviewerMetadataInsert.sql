CREATE OR REPLACE FUNCTION "fnReviewerMetadataInsert"(
  _answers json,
  _email text)
    RETURNS void
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
declare _reviewer_id integer;
declare _enteredby_id integer;

BEGIN
  _reviewer_id = (select reviewer_id from reviewers where emailaddress = _email);
  UPDATE reviewermetadata
  SET active = FALSE
  WHERE active = TRUE
  AND reviewermetadata.reviewer_id = _reviewer_id;
  INSERT INTO reviewermetadata(reviewer_id, enteredby_id, metadata, active)
  VALUES(_reviewer_id, _enteredby_id, _answers, TRUE);
END;
$BODY$;