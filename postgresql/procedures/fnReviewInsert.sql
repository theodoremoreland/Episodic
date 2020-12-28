CREATE OR REPLACE FUNCTION public."fnReviewInsert"(
	_review jsonb,
	_email text,
  _series text)
    RETURNS void
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$
declare _series_id integer;
declare _enteredby_id integer;

BEGIN
  _enteredby_id = (select reviewer_id from reviewers where emailaddress=_email);
  _series_id = (select series_id from series where name=_series);
  
  INSERT INTO reviews(series_id, enteredby_id, review)
  VALUES(_series_id, _enteredby_id, _review);
END;
$BODY$;