# pr_approve_check_action
check the number of approve is valid

----------------------------------------------------------------
1. min-approval `default = 1`
  - minimum number of approval reviewer
2. github-token `required`
  - need github token 

ex)
```
name: approve check
on:
  pull_request_review:
    types: [submitted]
jobs:
  pr-automerge:
    if: github.event.review.state == 'approved'
    runs-on: ubuntu-latest
    steps:
      - name : Check Approve
        uses : 4835/pr_approve_check_action@1.0.8
        with:
          min-approval: 1
          github-token: ${{ secrets.GITHUB_TOKEN }}
          
```
