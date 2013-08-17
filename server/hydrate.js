// if the database is empty on server start, create some sample data.
Meteor.startup(function () {

  var userId = null;

  // create sample user
  if (Meteor.users.find().count() === 0) {
    userId = Accounts.createUser({
      email: 'jfreeman@veroortho.com',
      password: '29483270',
      profile: {
        providerId: '30F4761C-EF78-49FB-9492-98526A6A5A38' // coren
      }
    });
  };


  var tags = [
    { title: 'Injection' },
    { title: 'HPI' },
    { title: 'Plan' },
    { title: 'Exam' },
    { title: 'Lower Extremity' },
    { title: 'Left' }
  ];

  if (Tags.find().count() === 0) {
    for (var i = 0; i < tags.length; i++) {
      console.log('inserting tag...');
      Tags.insert(tags[i]);
    }
  }

  var injectionId = Tags.findOne({title: 'Injection'})._id;
  var hpiId = Tags.findOne({title: 'HPI'})._id;
  var planId = Tags.findOne({title: 'Plan'})._id;

  var phrases = [
    {
      title: 'Biceps Tendon Sheath Injection', 
      text: 'The risks, benefits and alternatives to a therapeutic steroid injection of the proximal bicipital tendon sheath were discussed and reviewed.  The injection consent form outlining the proposed procedure, risks, and complications as well as the alternatives was reviewed by the nurse.  The patient signed this form and wishes to proceed.  The patient was positioned in a seated position, and the anterior aspect of the  shoulder and arm was prepped and draped in the usual sterile fashion with the arm at the side.  Aerosolized ethyl chloride was used as preinjection topical anesthetic.  A solution of 1cc of 40mg/mL Depo-Medrol and 4cc of 0.25% Marcaine with epinephrine was injected along the area of maximal tenderness deep to the level of the bicipital tendon sheath via a 25-gauge needle.  The patient tolerated the procedure well.  There were no known complications.  The patient noted immediate relief of discomfort over this region.  A sterile Band-Aid was applied.  The onset and potential duration of effect of the medications were reviewed.', 
      tags: [injectionId, planId],
      userId: userId
    }, 
    {
      title: 'Orthovisc Injection', 
      text: 'It is my medical opinion that the patient is an acceptable candidate for viscosupplementation injections. The evidence to support this is consistent with the Medicare regulations regarding the use of this therapy.  The patient has persistent pain interfering with daily activities including ambulation. Plain film radiographs confirm a diagnosis of osteoarthritis of the joint. The patient has failed three months of conservative therapy defined by Medicare as nonpharmacologic therapy including a home exercise program incorporating activity modification and education, analgesics where not contraindicated, and a failed response to an intraarticular corticosteroid injection previously. The risks, benefits and alternatives to intraarticular viscosupplementation to the knee were reviewed.  The injection consent form outlining the proposed procedure, risks and complications as well as alternatives was reviewed by the nurse. The patient signed this form and wished to proceed. The patient was positioned in a supine position and the  knee was prepped in the usual sterile fashion.  Aerosolized Ethyl Chloride was used as a pre-injection topical anesthetic.  A lateral suprapatellar approach to the intraarticular space of the knee was obtained with the use of an 18-gauge needle. A 2 mm solution of Orthovisc was then injected.  A sterile Band-Aid was applied. The patient tolerated the procedure well and there were no observable complications.', 
      tags: [injectionId, hpiId],
      userId: userId
    }, 
    {
      title: 'Trigger finger injection', 
      text: 'The risks, benefits and alternatives of corticosteroid injection for trigger finger were discussed and reviewed with the patient. The injection consent form outlining the proposed procedure, risks and complications as well as alternatives was reviewed by the nurse. The patient signed this form and wished to proceed. The patients  hand was prepped with the palmer aspect of the hand facing up with the fingers in extension. The flexor tendon sheath was palpated over the affected finger.  Aerosolized Ethyl Chloride was used as a pre-injection topical anesthetic.  Local anesthetic of 1% lidocaine without epinephrine and 1 cc of 1% lidocaine was utilized and a combination of 1 cc of 40 mg Depo Medrol and 1 cc 0.25% marcaine without epinephrine, were injected in combination at the level of the flexor tendon sheath with a positive wave sign and no resistance. A sterile Band-Aid was applied. The patient tolerated this procedure well with no observable complications.  The patient had immediate relief of discomfort on finger flexion.  The onset and potential duration of effect of the medications were reviewed.', 
      tags: [injectionId, planId, hpiId],
      userId: userId
    }, 
    {
      title: 'Knee Injection', 
      text: 'The risks, benefits and alternatives to corticosteroid injection to the knee were reviewed. The injection consent form outlining the proposed procedure, risks and complications as well as alternatives was reviewed by the nurse. The patient signed this form and wished to proceed. The patient was positioned in a supine position and the  knee was prepped in the usual sterile fashion.  Aerosolized Ethyl Chloride was used as a pre-injection topical anesthetic.  A lateral suprapatellar approach to the intraarticular space of the knee was obtained with the use of an 18 gauge needle. 2 cc of 40 mg per ml Depo-Medrol and 7 cc 0.25% marcaine with epinephrine was injected. A sterile Band-Aid was applied. The patient tolerated the procedure well with no  observable complications.  The patient noted immediate relief of discomfort  within the knee.  The onset and potential duration of effect of the medications were reviewed.', 
      tags: [injectionId],
      userId: userId
    }, 
    {
      title: 'Knee Joint Aspiration', 
      text: 'The risks, benefits and alternatives to aspiration of the knee were reviewed.  The injection consent form outlining the proposed procedure, risks and complications as well as alternatives was reviewed by the nurse. The patient signed this form and wished to proceed. The patient was positioned in a supine position and the  knee was prepped in the usual sterile fashion.  A lateral suprapatellar approach to the intraarticular space of the knee was obtained with the use of an 18 gauge needle.   cc of straw-colored fluid was aspirated from the intraarticular space of the knee.  A sterile Band-Aid was applied. The patient tolerated the procedure well.  There were no observable complications.', 
      tags: [],
      userId: userId
    }, 
    {
      title: 'Glenohumeral injection', 
      text: 'The risks, benefits and alternatives to glenohumeral corticosteroid injection were discussed and reviewed. The injection consent form outlining the proposed procedure, risks and complications as well as alternatives was reviewed by the nurse. The patient signed this form and wished to proceed.  The patient was positioned in a seated position and the shoulder was then prepped in the usual sterile fashion.   Aerosolized Ethyl Chloride was used as a pre-injection topical anesthetic. 5 cc of 1% lidocaine was injected through a posterior portal approach to the glenohumeral space for local anesthetic. This was followed by the injection of a solution of 2 cc of 40 mg per ml Depo Medrol and 7 cc marcaine 0.25% with epinephrine via an 18 gauge spinal needle via the posterior/inferior capsule into the glenohumeral space.   A sterile Band-Aid was applied.  The patient tolerated the procedure well and there were no known complications.  The onset and potential duration of effect of the medications were reviewed.', 
      tags: [injectionId],
      userId: userId
    }, 
    {
      title: 'AC joint injection', 
      text: 'The risks, benefits and alternatives to a corticosteroid injection of the  acromioclavicular joint were discussed and reviewed.  The injection consent form outlining the proposed procedure, risks and complications as well as alternatives was reviewed by the nurse. The patient signed this form and wished to proceed. The region of the acromioclavicular joint was palpated and mapped out and prepped in the usual sterile fashion.  Aerosolized Ethyl Chloride was used as a pre-injection topical anesthetic.  3 cc of 1% lidocaine without epinephrine was used for local anesthetic with the use of 25 gauge needle. This allowed for palpation along the medial border of the acromion dropping off into the acromioclavicular joint.  Penetration through the capsule was palpable and syringe was exchanged with a syringe of 1 cc Depo Medrol and 3 cc 0.25% marcaine without epinephrine solution and was then injected until resistance was met.  A sterile Band-Aid was applied. The patient tolerated the procedure well and there were no observable complications.  The patient noted immediate improvement in symptoms about the acromioclavicular joint.  The onset and potential duration of effect of the medications were reviewed.', 
      tags: [injectionId],
      userId: userId
    }, 
    {
      title: 'Lateral epicondylar injection', 
      text: 'The risks, benefits and alternatives to therapeutic steroid injection and percutaneous healing response for lateral epicondylitis were discussed and reviewed with the patient.   The injection consent form outlining the proposed procedure, risks and complications as well as alternatives was reviewed by the nurse. The patient signed this form and wished to proceed.  The patient was then positioned in the prone position with the  elbow flexed approximately 90 degrees and the common extensor origin was palpated at the elbow at the area of maximal tenderness.  The area was prepped in the usual fashion under sterile technique with betadine.  Aerosolized Ethyl Chloride was used as a pre-injection topical anesthetic. 5cc of 1% lidocaine without epinephrine was injected for local anesthetic followed by a solution of 1 cc of 40 mg per ml Depo Medrol with 4cc of 0.25% marcaine without epinephrine.  The needle was inserted to the level of the bone at the extensor origin and approximately 3 cc of the contents were injected with proximal to distal stimulation of the bony origin. Careful technique was utilized to remain anterior to the lateral collateral ligament. A sterile Band-Aid was applied.  The patient tolerated the procedure well. There were no known complications. The patient noted immediate, near-complete, relief of the lateral epicondylar pain post-injection.  The onset and potential duration of effect of the medications were reviewed.', 
      tags: [injectionId],
      userId: userId
    }, 
    {
      title: 'Medial epicondylar injection', 
      text: 'The risks, benefits and alternatives to therapeutic steroid injection and percutaneous healing response for medial epicondylitis were discussed and reviewed with the patient.   The injection consent form outlining the proposed procedure, risks and complications as well as alternatives was reviewed by the nurse. The patient signed this form and wished to proceed. The patient was then positioned in the supine position with the  elbow flexed approximately 90 degrees and the common flexor origin was palpated at the elbow at the area of maximal tenderness.  The area was prepped in the usual fashion under sterile technique with betadine.  Aerosolized Ethyl Chloride was used as a pre-injection topical anesthetic.  2cc of 1% marcaine without epinephrine was injected for local anesthetic followed by a solution of 1 cc of 40 mg per ml Depo Medrol with 4 cc of 0.25% marcaine without epinephrine.  The needle was inserted to the level of the bone at the flexor origin and approximately 3 cc of the contents were injected with proximal to distal stimulation of the bony origin. Careful technique was utilized to remain anterior to the medial collateral ligament and ulnar nerve. A sterile Band-Aid was applied.  The patient tolerated the procedure well. There were no known complications. The patient noted immediate, near-complete, relief of the lateral epicondylar pain post-injection.  The onset and potential duration of effect of the medications were reviewed.', 
      tags: [injectionId],
      userId: userId
    }, 
    {
      title: 'Pes and Gerdys knee injection', 
      text: 'The risks, benefits and alternatives to injection of the  tubercle at the knee were discussed and reviewed. The injection consent form outlining the proposed procedure, risks and complications as well as alternatives was reviewed by the nurse. The patient signed this form and wished to proceed. The patient was then prepped in the usual sterile fashion.   Aerosolized Ethyl Chloride was used as a pre-injection topical anesthetic. 1 cc of 40 mg per ml Depo Medrol combined with 1 cc of 0.25% marcaine with epinephrine  and 1 cc of 1% lidocaine was drawn and injected via 25 gauge needle at the point of maximal tenderness along the tendon insertions to the depth of the bursal layer. The injection was met without resistance and the patient tolerated the procedure well with no known complications. A sterile Band-Aid was applied. The patient noted immediate improvement in symptoms over this region of the knee.  The onset and potential duration of effect of the medications were reviewed.', 
      tags: [injectionId],
      userId: userId
    }, 
    {
      title: 'Subacromial injection', 
      text: 'The risks, benefits and alternatives to subacromial corticosteroid injection were discussed and reviewed. The injection consent form outlining the proposed procedure, risks and complications as well as alternatives was reviewed by the nurse. The patient signed this form and wished to proceed. The patient was positioned in a seated position and the  shoulder was then prepped in the usual sterile fashion.   Aerosolized Ethyl Chloride was used as a pre-injection topical anesthetic.  2 cc of 40 mg per ml Depo Medrol and 7 cc 0.25% marcaine with epinephrine was injected through a posterior portal approach to the subacromial space via an 18 gauge needle. The patient tolerated the procedure well and there were no complications.  The patient noted  immediate relief of discomfort within the shoulder.  A sterile Band-Aid was applied.  The onset and potential duration of effect of the medications were reviewed.', 
      tags: [injectionId],
      userId: userId
    }, 
    {
      title: 'Viscosupplementation Injection', 
      text: 'It is my medical opinion that the patient is an acceptable candidate for viscosupplementation injections. The evidence to support this is consistent with the Medicare regulations regarding the use of this therapy.  The patient has persistent pain interfering with daily activities including ambulation. Plain film radiographs confirm a diagnosis of osteoarthritis of the joint. The patient has failed three months of conservative therapy defined by Medicare as nonpharmacologic therapy including a home exercise program incorporating activity modification and education, analgesics where not contraindicated, and a failed response to an intraarticular corticosteroid injection previously. The risks, benefits and alternatives to intraarticular viscosupplementation to the knee were reviewed.  The injection consent form outlining the proposed procedure, risks and complications as well as alternatives was reviewed by the nurse. The patient signed this form and wished to proceed. The patient was positioned in a supine position and the  knee was prepped in the usual sterile fashion.  Aerosolized Ethyl Chloride was used as a pre-injection topical anesthetic.  A lateral suprapatellar approach to the intraarticular space of the knee was obtained with the use of an 18-gauge needle. A 2.5 cc solution of Synvisc One was then injected.  A sterile Band-Aid was applied. The patient tolerated the procedure well and there were no observable complications. ', 
      tags: [injectionId],
      userId: userId
    }, 
    {
      title: 'Trapeziometacarpal joint injection', 
      text: 'The risks, benefits and alternatives were discussed and reviewed regarding corticosteroid injections of the  trapeziometacarpal joint.  The injection consent form outlining the proposed procedure, risks and complications as well as alternatives was reviewed by the nurse. The patient signed this form and wished to proceed. The site was prepped in the usual sterile fashion.  Aerosolized Ethyl Chloride was used as a pre-injection topical anesthetic.  3 cc of 1% lidocaine without epinephrine was drawn up into a syringe with a 25 gauge needle which was then used for local anesthetic and localization 1 cc of Depo Medrol and 2 cc 0.25% marcaine without epinephrine solution, which was then injected until gentle resistance was met. A sterile Band-Aid was applied. The patient tolerated the procedure well with no observable complications, noting immediate improvement in symptoms with motion at the base of the thumb. The site was dressed with a sterile band-aid.  The onset and potential duration of effect of the medications were reviewed.', 
      tags: [injectionId],
      userId: userId
    }, 
    {
      title: 'Trochanteric bursal injection', 
      text: 'The risks, benefits and alternatives were discussed and reviewed regarding corticosteroid injection of the  trochanteric bursa.  The injection consent form outlining the proposed procedure, risks and complications as well as alternatives was reviewed by the nurse. The patient signed this form and wished to proceed. The patient was positioned in the lateral decubitus position with the asymptomatic hip down. The symptomatic hip was then prepped in the usual sterile fashion. Aerosolized Ethyl Chloride was used as a pre-injection topical anesthetic.  2 cc of Depo Medrol and 7 cc  0.25% marcaine with epinephrine were drawn up into a 10 cc syringe. The solution was injected at the point of maximal tenderness in a wheal fashion for maximal effect with the use of an 18-gauge needle inserted to the level of the trochanteric bursa.  No resistance was met. A sterile Band-Aid was applied. The patient tolerated the procedure well and there were no observable complications. The patient noted immediate improvement in symptoms along the lateral hip region with ambulation. The various effects and onsets of the medications were discussed and reviewed. The patient was given ample opportunity to have all questions answered.  The onset and potential duration of effect of the medications were reviewed.', 
      tags: [injectionId],
      userId: userId
    }, 
    {
      title: 'Wrist Injection', 
      text: 'The risks, benefits and alternatives to therapeutic steroid injection of the  wrist were discussed and reviewed with the patient. the injection consent form outlining the proposed procedure, risks and complications as well as alternatives were reviewed by the nurse. The patient signed this form and wishes to proceed. The patient was positioned in the seated position with the wrist held over the table, the bony landmarks about the wrist were palpated and the area was prepped in the usual fashion under sterile technique with betadine, aerosolized ethylchloride was used as a pre-injection topical anesthetic. A dorsal arthroscopic portal 3-4 portal approach to the wrist joint was utilized with a 25 gauge needle. A solution of 2 cc of 0.25% marcaine without epinephrine and 1 cc of 40 mg per mL Depo Medrol was injected into the joint without difficulty.  Sterile Band-Aid was applied. The patient tolerated the procedure well. There were no known complications. She noted immediate improvement in the discomfort along the ulnar aspect of the wrist.  The onset and potential duration of effect of the medications were reviewed.', 
      tags: [injectionId],
      userId: userId
    }
  ];

  if (Phrases.find().count() === 0) {
    for (var i = 0; i < phrases.length; i++) {
      console.log('inserting phrase...');
      Phrases.insert(phrases[i]);
    }
  }
});

// delete all phrases from console
// Phrases.find().forEach(function(phrase){ Phrases.remove(phrase._id); });