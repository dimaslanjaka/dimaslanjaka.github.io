<?php
user_utility::i()->islogin(true);
?>
<div class="row row-sm mg-b-20">
  <div class="col-lg-8">
    <div class="row row-xs row-sm--sm">
      <div class="col-sm-6 col-md-3">
        <div class="card card-dashboard-seventeen">
          <div class="card-body">
            <h6 class="card-title">Total Accounts</h6>
            <div>
              <h4>3,980</h4>
              <span>Goal: 4,000</span>
            </div>
          </div>
          <div class="chart-wrapper">
            <div id="flotChart1" class="flot-chart"></div>
          </div><!-- chart-wrapper -->
        </div>
      </div><!-- col -->
      <div class="col-sm-6 col-md-3 mg-t-20 mg-sm-t-0">
        <div class="card card-dashboard-seventeen">
          <div class="card-body">
            <h6 class="card-title">Monthly Recurring Revenue (MRR)</h6>
            <div>
              <h4>368,035</h4>
              <span>Goal: 300,000</span>
            </div>
          </div><!-- card-body -->
          <div class="chart-wrapper">
            <div id="flotChart2" class="flot-chart"></div>
          </div><!-- chart-wrapper -->
        </div><!-- card -->
      </div><!-- col -->
      <div class="col-sm-6 col-md-3 mg-t-20 mg-md-t-0">
        <div class="card card-dashboard-seventeen bg-primary-dark tx-white">
          <div class="card-body">
            <h6 class="card-title">Monthly MRR Retention</h6>
            <div>
              <h4 class="text-white">102.3%</h4>
              <span class="op-7">Goal: 105.5%</span>
            </div>
          </div><!-- card-body -->
          <div class="chart-wrapper">
            <div id="flotChart3" class="flot-chart"></div>
          </div><!-- chart-wrapper -->
        </div><!-- card -->
      </div><!-- col -->
      <div class="col-sm-6 col-md-3 mg-t-20 mg-md-t-0">
        <div class="card card-dashboard-seventeen bg-primary tx-white">
          <div class="card-body">
            <h6 class="card-title">Average MRR per Account</h6>
            <div>
              <h4 class="text-white">$89</h4>
              <span class="op-7">Goal: $80</span>
            </div>
          </div><!-- card-body -->
          <div class="chart-wrapper">
            <div id="flotChart4" class="flot-chart"></div>
          </div><!-- chart-wrapper -->
        </div>
      </div><!-- col -->
      <div class="col-12 mg-t-20">
        <div class="card card-dashboard-nineteen">
          <div class="card-header">
            <h6 class="card-title">Account &amp; Monthly Recurring Revenue Growth</h6>
            <div class="row">
              <div class="col-6 col-md-5">
                <h4><span>$</span>620,076</h4>
                <label class="az-content-label">MRR Growth</label>
                <p>Measure How Fast You’re Growing Monthly Recurring Revenue. <a href="">Learn More</a></p>
              </div><!-- col -->
              <div class="col-6 col-md-5">
                <h4><span>$</span>1,200</h4>
                <label class="az-content-label">Avg. MRR/Customer</label>
                <p>The revenue generated per account on a monthly or yearly basis. <a href="">Learn More</a></p>
              </div><!-- col -->
            </div><!-- row -->
            <div class="chart-legend">
              <div>Growth Actual</div>
              <div>Actual</div>
              <div>Plan</div>
            </div>
          </div><!-- card-header -->
          <div class="card-body">
            <div class="flot-chart-wrapper">
              <div id="flotChart" class="flot-chart"></div>
            </div><!-- flot-chart-wrapper -->
          </div><!-- card-body -->
        </div><!-- card -->
      </div><!-- col -->
    </div><!-- row -->
  </div><!-- col -->
  <div class="col-lg-4 mg-t-20 mg-lg-t-0">
    <div class="card card-dashboard-eighteen">
      <h6 class="card-title mg-b-5">Finance Monitoring</h6>
      <p class="tx-gray-500 mg-b-0">July 01,2018 - September 30,2018</p>
      <div class="card-body row row-xs">
        <div class="col-6">
          <h6 class="dot-primary"><span>$</span>387,098</h6>
          <label>Accounts Receivable</label>
        </div><!-- col -->
        <div class="col-6">
          <h6 class="dot-purple"><span>$</span>657,213</h6>
          <label>Accounts Payable</label>
        </div><!-- col -->
        <div class="col-6 mg-t-30">
          <h6 class="dot-teal"><span>$</span>332,891</h6>
          <label>Monthly Burn</label>
        </div><!-- col -->
        <div class="col-6 mg-t-30">
          <h6 class="dot-dark-blue"><span>$</span>78,005</h6>
          <label>Net Monthly Burn</label>
        </div><!-- col -->
      </div><!-- card-body -->
      <h6 class="card-title mg-b-10">Monthly Trends</h6>
      <div class="chartjs-wrapper"><canvas id="chartBar5"></canvas></div>
    </div><!-- card -->
  </div><!-- col -->
  <div class="col-lg-6 mg-t-20">
    <div class="card card-dashboard-twenty ht-md-100p">
      <div class="card-body">
        <h6 class="az-content-label tx-13 mg-b-5">Account Retention <span>(This Year)</span></h6>
        <p class="mg-b-25">Number of customers who have active subscription with you.</p>

        <div class="chartjs-wrapper"><canvas id="chartBar6"></canvas></div>
      </div><!-- card-body -->
    </div><!-- card -->
  </div><!-- col -->
  <div class="col-lg-6 mg-t-20">
    <div class="row row-sm">
      <div class="col-sm-6">
        <div class="card card-dashboard-twenty">
          <div class="card-body">
            <label class="az-content-label tx-13 tx-primary">Expansions</label>
            <p>Customers who have upgraded the level of your products or service.</p>
            <div class="expansion-value">
              <strong>$1,500</strong>
              <strong>$1,120</strong>
            </div>
            <div class="progress">
              <div class="progress-bar wd-70p" role="progressbar" aria-valuenow="70" aria-valuemin="0"
                aria-valuemax="100"></div>
            </div>
            <div class="expansion-label">
              <span>This Month</span>
              <span>Previous Month</span>
            </div>
          </div>
        </div><!-- card -->
      </div><!-- col -->
      <div class="col-sm-6 mg-t-20 mg-sm-t-0">
        <div class="card card-dashboard-twenty ht-md-100p">
          <div class="card-body">
            <label class="az-content-label tx-13 tx-danger">Cancellations</label>
            <p>Customers who have ended their subscription with you.</p>
            <div class="expansion-value">
              <strong>$1,900</strong>
              <strong>$1,680</strong>
            </div>
            <div class="progress">
              <div class="progress-bar wd-50p bg-danger" role="progressbar" aria-valuenow="50" aria-valuemin="0"
                aria-valuemax="100"></div>
            </div>
            <div class="expansion-label">
              <span>This Month</span>
              <span>Previous Month</span>
            </div>
          </div>
        </div><!-- card -->
      </div><!-- col -->
      <div class="col mg-t-20">
        <div class="card card-dashboard-progress">
          <div class="card-body">
            <div class="d-sm-flex justify-content-between mg-b-20">
              <label class="az-content-label tx-13 mg-b-10 mg-sm-b-0">MRR (September)</label>
              <ul class="progress-legend">
                <li>Expansion</li>
                <li>New</li>
              </ul>
            </div>
            <div class="media">
              <label>None:</label>
              <div class="media-body">
                <div id="progressBar1" class="progress">
                  <div class="progress-bar bg-primary" role="progressbar" aria-valuenow="0" aria-valuemin="0"
                    aria-valuemax="100"></div>
                  <div class="progress-bar bg-teal" role="progressbar" aria-valuenow="0" aria-valuemin="0"
                    aria-valuemax="100"></div>
                </div><!-- progress -->
              </div><!-- media-body -->
            </div><!-- media -->
            <div class="media">
              <label>Partner:</label>
              <div class="media-body">
                <div id="progressBar2" class="progress">
                  <div class="progress-bar bg-primary" role="progressbar" aria-valuenow="0" aria-valuemin="0"
                    aria-valuemax="100"></div>
                  <div class="progress-bar bg-teal" role="progressbar" aria-valuenow="0" aria-valuemin="0"
                    aria-valuemax="100"></div>
                </div><!-- progress -->
              </div><!-- media-body -->
            </div><!-- media -->
          </div><!-- card-body -->
        </div><!-- card -->
      </div><!-- col -->
    </div><!-- row -->
  </div><!-- col -->
</div><!-- row -->

<?php
//$script[] = ROOT . '/views/js/shortlink/user/earning.js';
