import claimantsService from './claimants';
import claimsService from './claims';
import contractsService from './contracts';
import filterService from './filter';
import relatedClaimService from './relatedClaim';
import sequenceService from './sequence';
import statusService from './status';
import userService from './user';

const atomService = {
  claimsService,
  relatedClaimService,
  filterService,
  sequenceService,
  statusService,
  claimantsService,
  contractsService,
  userService,
};

export default atomService;
