function pipeboard() {
 echo 'Your input: ' $1
#  function prep() {
#      bash ./installers/prep.sh
#  }
 if [ $1 = 'prep' ]
 then
    bash ./installers/prep.sh
 fi
}